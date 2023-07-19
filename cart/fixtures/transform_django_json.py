import json

file_name = 'shoes.json'

shoes_list = []

with open(file_name) as json_data:
    d = json.load(json_data)
    d = d['shoes']
    for item in d:
        pk = item['id']
        item.pop('id', None)
        item = {'model': 'cart.ShopItem', 'pk': pk, 'fields': item}
        shoes_list.append(item)
    json_data.close()


def list_to_json_file(list_of_dicts, file_name):
    with open(file_name, 'w') as file:
        json.dump(list_of_dicts, file)

list_to_json_file(shoes_list, 'shoes_django.json')
