# run this app in your local machine
---

## run project
1. clone this project
```bash
git clone `https://github.com/caotanduc/GO-webdev-test`
cd GO-webdev-test

```

2. install dependneces
```bash
python3 -m pip install -r requirements.txt
```

3. Migrate data
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

4. Run server
```bash
python3 manage.py runserver
```
## project checklist
Must have:
- [x] Display all products in Our Products section (for products data please check from Technical Requirements):
    - [x] Single product should have name, description, price, image and Add To Cart button.
    - [x] User able to click on Add To Cart to add target product to their cart.
    - [x] Added product doesn't have Add To Cart button anymore, it should have Check Mark Icon (✓) instead.
- [x] Display all added products in Your Cart section:
    - [x] Each product in cart should have name, price, image, increase/decrease amount button and remove button.
    - [x] User able to increase/decrease amount of a product in cart. When product's amount is decreased to zero, that product will be removed from cart naturally.
    - [x] User able to remove product from cart.
    - [x] Show total price of all products in car. When user increase/decrease product's amount or remove product, total price should be re-calculate correctly.
    - [x] When there are no products in cart, we should show Your cart is empty message.
    - [x] Products in cart should be persistent: When user visit the application, products are added before should be showed, user don't need to add products again.
    - [x] UI must follow correctly design from live demo.
Nice to have:
- [x] Responsive design (look good on all devices: desktops, tablets & mobile phones).
- [ ] Smooth animations (don't really need to be same as the demo, just do what you think is good).
- [x] Deploy the application to ~~heroku~~ [render.com](render.com).

**link web demo**: [golden-sneakers](https://golden-sneakers.onrender.com/)

**video demo**: [link](https://studenthcmusedu-my.sharepoint.com/:v:/g/personal/20120270_student_hcmus_edu_vn/EXJeZ9TDZplAtgoJ32dNHekB-6R0FKSLAgwlkwqpLaeJ3w?e=7ea2C3)


## tech stack
- Django
- mysql
- HTML / CSS
- JS (JQuery, AJAX)
- python (3.11.4)

## troubleshooting

## reference
- [webdev-intern-assignment](https://github.com/LarryPham1801/webdev-intern-assignment)
