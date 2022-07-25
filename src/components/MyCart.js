import {Button, Drawer, message, List, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {checkout, getCart} from "../utils";

const { Text } = Typography;

//Used drawer for shopping cart. Implemented shopping cart display and checkout
const MyCart = () => {
    const [cartVisible, setCartVisible] = useState(false);
    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    const showDrawer = () => {
        setCartVisible(true);
    };

    const onClose = () => {
        setCartVisible(false);
    };

    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Checkout successfully");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    }

    useEffect(() => {
        if (!cartVisible) {
            return;
        }
        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [cartVisible])


    return (
        <>
            <Button
                type="primary"
                onClick={showDrawer}
                shape="round"
            >
                Cart
            </Button>
            <Drawer
                title="My Shipping Cart"
                placement="right"
                onClose={onClose}
                visible={cartVisible}
                footer = {
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
                        <div>
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || cartData?.orderItemList.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    dataSource={cartData?.orderItemList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.orderItemName}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    )
}

export default MyCart