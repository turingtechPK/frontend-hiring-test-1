import { useRoutes } from 'react-router-dom';
import getRoutes from './routes';
import {useSelector} from "react-redux";

const RouterConfig = () => {
    const state = useSelector(state => state.user.token)
    return useRoutes(getRoutes(state));
};
export default RouterConfig;
