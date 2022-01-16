# Summer 2022 Data Science Intern Challenge 
Open collapsed sections for answers!

## Question 1
<details><summary>A</summary>
This data set shows the sales of sneakers in March 2017; in the 30 days, a naive AOV of $3145.13 is found when taking the average of the order_amount column. Upon sorting the sheet by descending on this column, the first 63 rows have order amounts > $25000. There seems to be two cases for these 63 outliers; the first case may be a supplier who bulk orders sneakers, and the second case may be a very expensive shoe model.

In the first case, the first 18 rows are user_id=607 who shops at shop_id=42 and always buys $704000 of 2000 items. This user is a clear outlier since all other customers buy <10 items in an order; the order_amount of $704000 is not unusual since the average cost of an item they buy is 704000/2000= $352. Since they seem to be ordering a large amount of sneakers consistently every few days in the month, it could be inferred that they are a supplier ordering in bulk. \
In the second case, the remaining 44 of 63 rows have orders of varying user_id, order_amount and total_items, but all from shop_id=78. This shop may sell one model of very expensive sneaker, since in all of these rows order_amount/total_items= $21725 (ie. users are buying multiples of this sneaker model). \
A better way of evaluating this data may be to recalculate the AOV after discarding outliers. Orders by suppliers (eg. orders with total_items > 500) could be excluded from the data, and depending on how sneaker prices are skewed, extreme sneaker prices could also be discarded from the data (eg. only include orders with sneaker prices within 2 standard deviations).
</details>

<details><summary>B</summary>
The median order value may be a better metric to report if the data cannot be cleaned (by discarding outliers).
</details>

<details><summary>C</summary>
The median order value is $284.
</details>


## Question 2
<details><summary>A</summary>
a. How many orders were shipped by Speedy Express in total?

ANS: 54
```
SELECT Count(Orders.OrderID), Shippers.ShipperName
FROM Orders
INNER JOIN Shippers ON Orders.ShipperID=Shippers.ShipperID
WHERE Shippers.ShipperName="Speedy Express";
```
</details>

<details><summary>B</summary>
b. What is the last name of the employee with the most orders?

ANS: Peacock
```
SELECT Orders.EmployeeID, Employees.LastName, COUNT(Orders.EmployeeID)
FROM Orders
INNER JOIN Employees on Orders.EmployeeID=Employees.EmployeeID
GROUP BY Orders.EmployeeID
ORDER BY COUNT(Orders.EmployeeID) DESC
LIMIT 1;
```
</details>

<details><summary>C</summary>
c. What product was ordered the most by customers in Germany?

ANS: Products.ProductID=40, Boston Crab Meat
```
SELECT Orders.OrderID, Customers.CustomerID, Customers.Country, OrderDetails.ProductID, OrderDetails.Quantity, Products.ProductName, SUM(OrderDetails.Quantity)
FROM (((Orders
INNER JOIN Customers ON Customers.CustomerID=Orders.CustomerID)
INNER JOIN OrderDetails ON Orders.OrderID=OrderDetails.OrderID)
INNER JOIN Products ON OrderDetails.ProductID=Products.ProductID)
WHERE Customers.Country="Germany"
GROUP BY OrderDetails.ProductID
ORDER BY SUM(OrderDetails.Quantity) DESC
LIMIT 1;
```
</details>
