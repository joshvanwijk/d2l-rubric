import json, pprint, os, shutil, argparse

from api_requests import api_requests
from rewrite_json import *

def get_args():
    parser = argparse.ArgumentParser()

    parser.add_argument('--url', dest='base_url', action='store',
                    help='specify the QA site url to get data from. For example https://qa123g.bspc.com')

    parser.add_argument('--pwd', dest='daily_pwd', action='store',
                    help='specify the password for today')

    parser.add_argument('--copy_files', dest='copy_files', action='store_true', default = False,
                    help='specify True to automatically copy generated files into the demo and test folders')
    
    return parser.parse_args()

args = get_args()
#the url and password will have to be updated based on 
#the latest available QA site and quad password
base_url = args.base_url
pwd = args.daily_pwd

support_user_name = 'd2lsupport'
student_user_name = 'demo_s'
rubrics_course_id = '131646'
#defined the rubrics we want to use by id and 'identifier'
#{'rubricId':['rubric-title','assessments-hash']}
rubric_ids = {'197':['default-rubric'],'198':['custom-points','''sYXIWuF0ETxFZ1zN1WinLjVTh5XzJgSaSfaMEXxBuJg/UnVicmljfERyb3Bib3h8NzA0'''],
'242':['text-only'],'199':['text-only-no-edit'],'203':['multiple-groups','''sYXIWuF0ETxFZ1zN1WinLjVTh5XzJgSaSfaMEXxBuJg/UnVicmljfERyb3Bib3h8NzA5'''],
'227':['holistic-text'],'226':['holistic-percent','''sYXIWuF0ETxFZ1zN1WinLjVTh5XzJgSaSfaMEXxBuJg/UnVicmljfERyb3Bib3h8NzA4''']}

#where the data will get written to
demo_data_path = os.path.join(os.getcwd(),'..','..','demo','data')
test_data_path = os.path.join(os.getcwd(),'..','components','data')

def get_endpoint(rubricId):
    return 'd2l/api/hm/rubrics/organizations/%s/%s'%(rubrics_course_id,rubricId)

my_api_requests = api_requests(base_url,support_user_name,pwd)

def get_rubric(rubric_href):
    response = my_api_requests.issueGetRequest(rubric_href)
    if not response.status_code==200:
        print ("Something went wrong. Couldn't find this rubric: %s"%rubric_href)
    default_rubric_response = response.json()
    return default_rubric_response

def get_all_links_from_json(full_json):
    links_list = []
    def is_links_callback(input):
        if type(input) is dict:
            for k,v in input.items():
                if k == 'links':
                    links_list.append(v)
        return input
    traverse_object(full_json,callback = is_links_callback)
    return links_list

def create_link_path(link,rubric_id):
    link_path = os.getcwd()
    original_path = os.getcwd()
    relative_href = link['href'].split(rubric_id)[1]
    rel_paths = relative_href.split('/')
    for p in rel_paths[1:]:
        if not p == rel_paths[-1]:
            if not os.path.exists(p):
                os.mkdir(p)
            os.chdir(p)
            link_path = os.path.join(link_path,p)
    os.chdir(original_path)
    return os.path.join(link_path,rel_paths[-1])

def write_json_file(json_file_path,new_response):
    with open(json_file_path,'w') as f:
        json.dump(new_response,f,indent=4)

def create_files(original_json,rubric_id,rub_title):
    all_links = get_all_links_from_json(original_json)
    for links in all_links:
        for link in links:
            if 'up' in link['rel']:
                continue    
            link_path = create_link_path(link,rubric_id)
            json_file_path = link_path
            if not os.path.exists(json_file_path):
                relative_href_no_dot_json = link['href'].split(rubric_id)[1][:-5]
                rubric_api_path = '%s%s'%(get_endpoint(rubric_id),relative_href_no_dot_json)
                new_response = get_rubric(rubric_api_path)
                new_response = replace_all_links_in_json(rubrics_course_id,new_response,rub_title)
                write_json_file(json_file_path,new_response)
                create_files(new_response,rubric_id,rub_title)

def get_endpoint_assessments(assessment_id,assessment_hash):
    return 'd2l/api/hm/assessments/assessment/%s/%s'%(assessment_id,assessment_hash)

def get_assessment(assesments_rel_href):
    my_api_handle = api_requests(base_url,student_user_name,pwd)
    response = my_api_handle.issueGetRequest(assesments_rel_href)
    if not response.status_code==200:
        print ("Something went wrong. Couldn't find this assessment: %s"%assesments_rel_href)
    assessment_response = response.json()
    return assessment_response

def correct_assessment_self_link(assessment_file_name,assessment_hash,rub_title):
    with open('%s.json'%assessment_file_name,'r') as f: 
        content = f.read()
        f.seek(0)
        new_content = content.replace(assessment_hash,assessment_file_name)
        new_content = new_content.replace('data/rubrics/assessment','data/rubrics/organizations/%s'%rub_title)
    with open('%s.json'%assessment_file_name,'w') as f:
        f.write(new_content)

first_dir = os.getcwd()
for rubric_id,data in rubric_ids.items():
    rub_title = data[0]
    base_path = 'data/rubrics/organizations/%s'%rub_title
    #make sure old data is removed first
    file_save_location = os.path.join(os.getcwd(),base_path)
    if os.path.exists(file_save_location):
        shutil.rmtree(file_save_location)
    os.makedirs(file_save_location)
    os.chdir(file_save_location)

    #write original starting point
    rub_href = get_endpoint(rubric_id)
    initial_rubric_response = get_rubric(rub_href)
    initial_rubric_response['links'] = replace_links(rubrics_course_id,initial_rubric_response['links'],rub_title)
    write_json_file('%s.json'%rubric_id,initial_rubric_response)

    #write groups to file
    rub_groups_href = '%s/groups'%get_endpoint(rubric_id)
    rub_groups_response = get_rubric(rub_groups_href)
    rub_groups_response = replace_all_links_in_json(rubrics_course_id,rub_groups_response,rub_title)

    if not os.path.exists(rubric_id):
        os.mkdir(rubric_id)
    os.chdir(rubric_id)
    
    write_json_file('groups.json',rub_groups_response)

    #create all remaining files
    create_files(rub_groups_response,rubric_id,rub_title)
    os.chdir(first_dir)

    #create assessments file
    if len(data) > 1:
        os.chdir(os.path.join(os.getcwd(),base_path,rubric_id))
        assessment_hash = data[1]
        assessment_json = get_assessment(get_endpoint_assessments(rubric_id,assessment_hash))
        assessment_file_name = '%s_assessment'%rub_title
        with open('%s.json'%assessment_file_name,'w') as f:
            json.dump(replace_all_links_in_json(rubrics_course_id,assessment_json,rub_title),f,indent=4)
        #fix self link
        correct_assessment_self_link(assessment_file_name,assessment_hash,rub_title)

        os.chdir(first_dir)


if args.copy_files:
    #move the files to demo/data
    shutil.rmtree(demo_data_path)
    shutil.copytree('data',demo_data_path)

    #move the files to test/component/data
    shutil.rmtree(test_data_path)
    shutil.move('data',test_data_path)

