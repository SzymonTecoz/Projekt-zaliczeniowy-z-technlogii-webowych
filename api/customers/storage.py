from functools import lru_cache

from .schema import Customer, Order, Product

CustomerStorageType = dict[int, Customer]
OrdersStorageType = dict[int, Order]
ProductsStorageType = dict[int, Product]

CUSTOMERS: CustomerStorageType = {}
ORDERS: OrdersStorageType = {
    0: Order(
        customer_id=0,
        order_items=[0,1,2],
        order_id=0,
    ),
    1: Order(
        customer_id=1,
        order_items=[3,4,5],
        order_id=1,
    ),
}
PRODUCTS: ProductsStorageType = {
    0: Product(name="Cebula", price=4.99, description="Mozna z niej zrobić zupę z elfem", id=0),
    1: Product(name="Air pods 3", price=999.99, description="Moze i za drogie, ale za to słabo grają", id=1),
    2: Product(name="AGH - udziały", price=999999.99, description="Kup udziały w najlepszej uczelni w Krakowie!", id=2),
    3: Product(name="Cement Zielony", price=24.99, description="Magia kolorów w świecie budownictwa! Ten niezwykły cement nie tylko doskonale spaja materiały, ale również dodaje energii i radości do Twojego projektu. Jego zielony odcień sprawia, że prace budowlane stają się przyjemnością, a ściany nabierają niezwykłego charakteru. Czy to budowa muru czy remont, Cement Zielony zapewni Ci nie tylko solidne połączenie, ale także wyjątkową atmosferę. Wybierz Cement Zielony i daj swoim projektom nowe życie - buduj z uśmiechem na twarzy!", id=3),
    4: Product(name="Honda Civic", price=4999.99, description="Doskonały driftowóz, tylko trzeba uwazać na Policję", id=4),
    5: Product(name="Pallad D", price=9999.99, description="Skoro komendant z niego strzelał, to czemu ty nie miałbyś?", id=5),
}


@lru_cache(maxsize=1)
def get_customers_storage() -> CustomerStorageType:
    return CUSTOMERS

@lru_cache(maxsize=1)
def get_products_storage() -> ProductsStorageType:
    return PRODUCTS

@lru_cache(maxsize=1)
def get_orders_storage() -> OrdersStorageType:
    return ORDERS


