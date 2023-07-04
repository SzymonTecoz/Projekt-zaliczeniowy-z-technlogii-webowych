from pydantic import BaseModel


class CustomerCreateSchema(BaseModel):
    name: str
    surname: str
    email: str
    phone_number: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Jan",
                "surname": "Kowalski",
                "email": "jan.kowalski@example.com",
                "phone_number": "000-000-000",
            }
        }


class CustomerUpdateSchema(BaseModel):
    name: str | None
    surname: str | None
    email: str | None
    phone_number: str | None

    class Config:
        schema_extra = {"example": {"name": "Jan", "surname": "Kowalski"}}


class Customer(CustomerCreateSchema):
    id: int


class OrderCreateSchema(BaseModel):
    customer_id: int
    order_items: list[int]

    class Config:
        schema_extra = {
            "example": {
                "customer_id": 0,
                "order_items": [0, 1, 2, 3],
            }
        }


class Order(OrderCreateSchema):
    order_id: int


class ProductCreateSchema(BaseModel):
    name: str
    price: float
    description: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Product",
                "price": 0.0,
                "description": "Product description",
            }
        }


class Product(ProductCreateSchema):
    id: int