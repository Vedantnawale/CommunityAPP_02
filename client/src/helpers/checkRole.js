import { useSelector } from "react-redux";

const useIsAdmin = () => {
  const role = useSelector((state) => state.auth?.data?.role);
  return role?.toLowerCase() === "admin";
};

export default useIsAdmin;
