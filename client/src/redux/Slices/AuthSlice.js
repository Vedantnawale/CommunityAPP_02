import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import { toast } from "react-hot-toast";

const storedData = localStorage.getItem('data');

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    data: storedData ? JSON.parse(storedData) : {},
    usersData: []
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const resPromise = axiosInstance.post("user/signup", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        toast.promise(resPromise, {
            loading: "Wait! creating your account",
            success: (data) => data?.data?.message,
            error: "Failed to create account"
        });

        const res = await resPromise;
        return res.data;
    } catch (error) {
        console.error("SIGNUP THUNK ERROR:", error);
        toast.error(error?.response?.data?.message || "Signup failed");
        throw error;
    }
});


export const signin = createAsyncThunk("/auth/signin", async (data) => {
    try {
        let res = axiosInstance.post("user/signin", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to login"
        });


        // getting response resolved here
        res = await res;
        return res.data;
        console.log(res.data);
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk(
    "/user/update/profile",
    async ({ userId, formData }, { rejectWithValue }) => {
        try {
            const resPromise = axiosInstance.put(`user/update/${userId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            toast.promise(resPromise, {
                loading: "Wait! Profile Update In Progress...",
                success: (res) => res?.data?.message || "Profile updated successfully!",
                error: (err) =>
                    err?.response?.data?.message || "Failed to update profile",
            });

            const res = await resPromise;
            return res.data;
        } catch (error) {
            console.error("Update Profile Error:", error?.response?.data);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);


export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("/user");
        return (await res).data
    } catch (error) {
        toast.error(error.message);
    }
})

export const getAllDevelopers = createAsyncThunk("/auth/developers", async () => {
    try {
        const res = axiosInstance.get("user/developers");
        const result = (await res)?.data?.data;
        //toast.success("Developers Fetch Successfully");
        return result;
    } catch (error) {
        toast.error(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signin.fulfilled, (state, action) => {
                if (!(action?.payload)) return
                localStorage.setItem("data", JSON.stringify(action?.payload?.data));
                localStorage.setItem("isLoggedIn", action?.payload?.success);
                state.isLoggedIn = action?.payload?.success;
                state.data = action?.payload?.data;
            })
            // for user logout
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('data');
                localStorage.removeItem('isLoggedIn');
                state.isLoggedIn = false;
                state.data = {};
            })


            // .addCase(getUserData.fulfilled, (state, action) => {
            //     //state.data = action?.payload?.user;
            // })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                // state.isLoggedIn = action?.payload?.success;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                console.log(action?.payload)
                state.data = action?.payload?.user;
            })
            .addCase(getAllDevelopers.fulfilled, (state, action) => {

                if (action?.payload) {
                    state.usersData = action.payload;
                }
            })

    }
})
export default authSlice.reducer;