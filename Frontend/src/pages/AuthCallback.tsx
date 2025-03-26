import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { useToast } from "@chakra-ui/react";
// import { setToken } from "../slices/authSlice";
// import { setUser } from "../slices/profileSlice";
// import { setCartId, setTotalItems } from "../slices/cartSlice";

import Loader from "../components/Loader";

interface UserDetails {
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
}

interface TokensResponse {
    access_token: string;
    refresh_token: string;
    cart_id: string;
    user_details: UserDetails;
}

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTokens = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<TokensResponse>(`${BASEAPI}/user/get-tokens`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const { access_token, refresh_token, cart_id, user_details } = response.data;

                    const user: UserDetails = {
                        ...user_details,
                        profile_picture:
                            user_details.profile_picture ||
                            `https://api.dicebear.com/5.x/initials/svg?seed=${user_details.first_name} ${user_details.last_name}`,
                    };

                    // dispatch(setToken(access_token));
                    // dispatch(setUser(user));
                    // dispatch(setCartId(cart_id));

                    // const { data } = await axios.get<{ cart: { items: unknown[] } }>(`${BASEAPI}/get-cart`, {
                    //     withCredentials: true,
                    // });

                    const totalItems = data?.cart?.items?.length || 0;
                    // dispatch(setTotalItems(totalItems));
                    //
                    // toast({
                    //     title: "Login successful!",
                    //     status: "success",
                    //     duration: 2500,
                    //     isClosable: true,
                    // });

                    navigate("/");
                } else {
                    throw new Error("Login failed");
                }
            } catch (error) {
                console.error("Error fetching tokens:", error);
                // toast({
                //     title: "Error",
                //     description: "Failed to fetch tokens.",
                //     status: "error",
                //     duration: 2500,
                //     isClosable: true,
                // });
                navigate("/signin");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokens();
    }, [navigate, dispatch]);

    return isLoading ? <Loader /> : null;
};

export default AuthCallback;