# Test task

1 Description
I need to write a simple React.js application using https://redux-orm.github.io/redux-orm/ ** and TypeScript that retrieves a list of products and categories over the network, displays them on the screen, and provides the ability to add them to a cart and create an order.

The cart and order, for the sake of ease of implementation, should just be stored locally.
Appearance - https://www.figma.com/

Note that on the layout can be presented additional interactive elements and areas that need to be displayed in the interface, but do not need to make any mechanics of interaction with them. In the right part there are banners, which do not imply transitions, but which should be visible at any screen resolution. Profile icon, address, bottom part of the layout should be minimized but should not contain additional transitions.

**- Redux ORM is a must. Check the ability to understand the framework. Assume it will be unfamiliar.

1.1 Data
Data - several categories containing products.
A simple REST interface is implemented to retrieve the data.
To get the list of entities, a GET request of the following form is used
https://test2.sionic.ru/api/{model}
Where {model} is the name of the entity
The request parameters are passed as a json encoded string. The following query parameters are available:
filter - filtering on any property of the entity, for example filter={“category_id”:20} for the Products model will return us all products of the category with id=20. You can also specify values as an array if you want to filter multiple id's, e.g. filter={“category_id”:[20,21,22]}
sort - sort entities by any property, for example sort=[“name”, “ASC”] for the Products model will sort products by name in ascending order.
range - range selection, for example range=[0,24] will return all entities from the 0th to the 24th, 25 in total.
No more than 50 records are returned in one query.
The total number of records is returned as a header, for example:
Content-Range: Products 0-24/319
To get one record by its id, a query of the following form is used
https://test2.sionic.ru/api/{model}/{id}
Where {model} is the name of the entity and {id} is its id

Description of Methods:

```js
Categories:
GET https://test2.sionic.ru/api/Categories?sort=[“name”, “ASC”]&range=[0,24]
GET https://test2.sionic.ru/api/Categories/21

Properties:
name - category name

Products:
GET https://test2.sionic.ru/api/Products?sort=[“name”, “ASC”]&range=[0,24]&filter={“category_id”:20}
GET https://test2.sionic.ru/api/Products/2001

Properties:
name - product name
category_id - category id
description - product description
Product images:
GET https://test2.sionic.ru/api/ProductImages?sort=[“image_name”, “ASC”]&range=[0,24]&filter={“product_id”:1001}
GET https://test2.sionic.ru/api/ProductImages/3001

Properties
image_name - image file name
product_id - product id
image_url - link to the image
Product variations:
GET https://test2.sionic.ru/api/ProductVariations
GET https://test2.sionic.ru/api/ProductVariations/1
product_id - product id
price - price of this product variation
stock - quantity in stock

Properties of variations:
GET https://test2.sionic.ru/api/ProductVariationProperties
GET https://test2.sionic.ru/api/ProductVariationProperties/1

Properties:
name - property name
type - property type: 
0 - string, 
1 - integer, 
2 - floating point number, 
3 - value from the list

Values of variation property lists:
GET https://test2.sionic.ru/api/ProductVariationPropertyListValues
GET https://test2.sionic.ru/api/ProductVariationPropertyListValues/1

Properties:
product_variation_property_id - id of the variation property
title - value title
value - value

Variation property values:
GET https://test2.sionic.ru/api/ProductVariationPropertyValues
GET https://test2.sionic.ru/api/ProductVariationPropertyValues/1

Properties:
product_variation_id - id of the variation property
product_variation_property_id - variation property id
value_string - value of string type
value_int - value of integer type
value_float - value of floating point type
product_variation_property_list_value_id - id of variation property value from the list
```
1.2 Application
The application should be written in React, run on modern browsers. When the application starts, a screen with a list of categories and products opens. Each product can be put in the cart and eventually make an order. There should also be a screen displaying a list of created orders.

The shopping cart and the order do not need to be implemented over the network, just store them in local storage.

Whether the data screens will be made by different components, one component, or something else is at the discretion of the implementer.

On all screens of the application there should be a button to go to the shopping cart, as well as a button to go to the list of created orders.

1.2.1 Categories
The categories screen should display all categories received from the server, with the ability to select one of them and show the goods of only one category. On the list of products for a particular category, the list of products belonging to that category is displayed. Near each product displays its name, price and properties, as well as a button to add to cart. If you press it, the product is added to the cart.



1.2.2 Product
The list of goods for a particular category displays the list of goods belonging to this category. Near each product is displayed its name, minimum price (the price of the cheapest variation) and properties, as well as a button to add to cart. When clicking on it, the user selects the variation he wants to add to cart.

In the product card it is necessary to display buttons for selecting a variation by its properties. When the user clicks on the add to cart button, the specific variation of the product selected by the user is added.


1.2.3 Ordering
On the ordering screen there is a form with text fields:

- Name
- Address
- Phone
- Time

All fields are mandatory. After filling out all fields the user can click on the “Checkout” button, a new order will be created with the contents of the currently selected cart, and the cart itself will be cleared.

After placing an order, the user can go to the page of order history.

1.2.4 Order History
This screen displays a list of all created orders of the user, with their contents (cart) and date of creation.


1.3 Need to do
It is necessary to realize:
Output of products with loading (infinite scroll).
Filters in categories by product name and price.
Adaptive layout for mobile devices.

Addendum 01/2024 - make a variant with 0% discount. Discount is not processed in any way.

![Cart](https://github.com/kristinamartinkevich/store/src/assets/Cart.png?raw=true)
![Delivery](https://github.com/kristinamartinkevich/store/src/assets/Delivery.png?raw=true)
![OrderHistory](https://github.com/kristinamartinkevich/store/src/assets/OrderHistory.png?raw=true)
![Recomendations](https://github.com/kristinamartinkevich/store/src/assets/Recomendations.png?raw=true)

# store
