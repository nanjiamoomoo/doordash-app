import {message, Select, List, Card, Image, Button, Tooltip} from 'antd';
import {useEffect, useState } from "react";
import {getMenus, getRestaurants, addItemToCart} from "../utils";
import {PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

//add items to the shopping cart
const AddToCartButton = ( {itemId} ) => {
    console.log("menuItem id: " + itemId)
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Add Item Successfully`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}
            />
        </Tooltip>
    );
}

//show all restaurant options and display menus info after selecting restaurant
const MenuItemList = () => {
    const [restaurantsLoading, setRestaurantsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [currRestaurant, setCurrRestaurant] = useState()
    const [menusLoading, setMenusLoading] = useState(false);
    const [menus, setMenus] = useState([]);

    useEffect( () => {
        setRestaurantsLoading(true);
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setRestaurantsLoading(false);
            })
    }, [])

    useEffect( () => {
        if (currRestaurant) {
            setMenusLoading(true);
            getMenus(currRestaurant)
                .then((data) => {
                    setMenus(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setMenusLoading(false);
                })
        }
    }, [currRestaurant])

    return (
        <>
            <Select
                placeholder="Select a restaurant"
                onSelect={(value) => {
                    setCurrRestaurant(value)
                }}
                style={{ width: 300 }}
                loading = {restaurantsLoading}
            >
                {
                    restaurants && (
                        restaurants.map((restaurant, index)=> {
                            return  <Option key={index + 1} value={restaurant.id}>{restaurant.name}</Option>
                        })
                    )
                }
            </Select>
            {
                currRestaurant && (
                    <List
                        loading={menusLoading}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 3,
                            xxl: 3,
                        }}
                        dataSource={menus}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    title={item.name}
                                    extra={<AddToCartButton itemId={item.menuItemId} />}
                                >
                                    <Image
                                        style={{ height: 340, width: "100%"}}
                                        src={item.imageUrl}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                )
            }
        </>
    )
}

export default MenuItemList;