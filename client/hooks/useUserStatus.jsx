const useUserStatus = ()=>{
    const userStatus = localStorage.getItem("userInfo")? true: false;
    return userStatus
}

export default useUserStatus;