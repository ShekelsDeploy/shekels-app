import { FC } from "react";
import Content from './Content';
import { NotificationContainer } from 'react-notifications';
import Menu from "./Menu";
import { useSelector } from "react-redux";
import StickyMenu from "./StickyMenu";

interface Props {

}
export const IndexLayout: FC<Props> = ({ }) => {
    const accountData: any = useSelector((state: any) => state.accountData.value);
    return (
        <>
            <div>
                <StickyMenu />
            </div>
            <div className={accountData?.logged === 1 ? '' : 'hidden'}>
                <Menu />
            </div>
            <div className={accountData?.logged === 1 ? 'ml-[55px]' : '' + "content-wrapper"}>
                <Content />
            </div>
            <NotificationContainer />
        </>
    )

}