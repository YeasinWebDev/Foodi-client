import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/ContextProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: role = [], isLoading: isRoleLoading } = useQuery({
        queryKey: ['role',user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user`, { params: { email: user?.email } });
            return response.data.role;
        }
    });
    return [role, isRoleLoading]
}

export default useRole;