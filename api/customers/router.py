from fastapi import APIRouter, HTTPException

from .storage import get_customers_storage, get_orders_storage, get_products_storage
from .schema import (
    CustomerCreateSchema,
    CustomerUpdateSchema,
    Customer,
    Order,
    Product,
)

router = APIRouter()


CUSTOMERS_STORAGE = get_customers_storage()
ORDERS_STORAGE = get_orders_storage()
PRODUCT_STORAGE = get_products_storage()


@router.get("/customers")
async def get_customers() -> list[Customer]:
    return list(get_customers_storage().values())


@router.get("/customers/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.patch("/customers/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    if customer_id not in CUSTOMERS_STORAGE:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

    CUSTOMERS_STORAGE[customer_id] = Customer(
        **(
            CUSTOMERS_STORAGE[customer_id].dict()
            | updated_customer.dict(exclude_unset=True)
        )
    )
    return CUSTOMERS_STORAGE[customer_id]


@router.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.post("/customers")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    index = len(CUSTOMERS_STORAGE)
    CUSTOMERS_STORAGE[index] = Customer(id=index, **customer.dict())

    return CUSTOMERS_STORAGE[index]


@router.get("/orders")
async def get_orders() -> list[Order]:
    return list(get_orders_storage().values())


@router.get("/orders/{order_id}")
async def get_order(order_id: int) -> Order:
    try:
        return ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )


@router.get("/products")
async def get_products() -> list[Product]:
    return list(get_products_storage().values())


@router.get("/products/{product_id}")
async def get_product(product_id: int) -> Product:
    try:
        return PRODUCT_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )

