import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { getMyFollowingsAction } from "../redux/actions/userAction"

const useGetFollowings = (params: any[] = []) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyFollowingsAction())
    }, params)
}

export default useGetFollowings