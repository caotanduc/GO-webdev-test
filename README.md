# run this app in your local machine
---

**Link website**: Golden Sneakers [https://golden-sneakers.onrender.com/](https://golden-sneakers.onrender.com/)

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
python3 manage.py makemigrations --settings=shoppingCartApp.settings_local
python3 manage.py migrate --settings=shoppingCartApp.settings_local
```

4. Load data
```bash
python3 manage.py loaddata shoes_django.json
```

5. Run server
```bash
python3 manage.py runserver --settings=shoppingCartApp.settings_local
```

## tech stack
- BE & FE: Django
- Database:
    - local: sqlite3
    - deploy: MySQL
- JS (JQuery)
- Python (3.11.4)

## deploy process [render.com](render.com)
1. create accout on [render.com](render.com)
2. Dashboard > New > Web Service
3. Fork this project to your own Github
4. Reopen [render.com] / Dasboard
5. Connect to your Github Accout
6. Choose project you forked 
7. In you Render project dashboard open Environment > Add Environment Variable
    - PYTHON_VERSON: 3.11.4
    - Remote Database Info
        - HOST
        - USER
        - NAME
        - PASSWORD

8. open Settings (Dashboard > Settings) in Start Command
```bash
gunicorn shoppingCartApp.wsgi:application
```

**Video Demo**: [Golden Sneakers Demo Video](https://studenthcmusedu-my.sharepoint.com/:v:/g/personal/20120270_student_hcmus_edu_vn/Eezb_elgPWBAs4CDgyjavtUBUBbN0RXEfJ9VuNOoDKWFwg?e=mLDSFx)


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

**Link website**: [golden-sneakers](https://golden-sneakers.onrender.com/)


## troubleshooting

## reference
- [webdev-intern-assignment](https://github.com/LarryPham1801/webdev-intern-assignment)
