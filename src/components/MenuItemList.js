import {message, Select} from 'antd';
import {useEffect, useState } from "react";
import {getRestaurants} from "../utils";

const { Option } = Select;
const MenuItemList = () => {
    const [restaurantsLoading, setRestaurantsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [currRestaurant, setCurrRestaurant] = useState()

    const onChange = () => {
        console.log();
    };

    useEffect( () => {
        setRestaurantsLoading(true);
        getRestaurants()
            .then((data) => {
                console.log(data)
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setRestaurantsLoading(false);
            })
    }, [])


    return (

        <Select
            placeholder="Select a restaurant"
            optionFilterProp="children"
            onChange={onChange}
            // filterOption={(input, option) =>
            //     (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            // }
            loading = {restaurantsLoading}
        >
            {
                restaurants.map((restaurant)=> {
                    return  <Option value={restaurant.id}>{restaurant.name}</Option>
                })
            }
        </Select>
    )
}

export default MenuItemList;