import { FC, useEffect, useMemo } from "react";
import './modal.css'
interface Props {
    dissmisable?: boolean,
    showModal: boolean,
    open: Function,
    children?: any
}
export const ModalCustom: FC<Props> = ({ children, showModal, open, dissmisable = true }) => {
    const handleParentClick = (event: any) => {
        // event.preventDefault(); ESTO DA BUG A LOS CHECKBOX
        if (dissmisable) {
            if (event.target === event.currentTarget) {
                open();
            }
        }
    };

    useMemo(() => {
        if (!showModal) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        } else {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        }
    }, [showModal]);

    return (
        <>
            <div className={showModal ? 'ease-out duration-300 opacity-100 z-10' : 'ease-in duration-200 opacity-0 invisible'}>
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    <div className="fixed z-10 inset-0 z-10 overflow-y-auto">
                        <div onClick={handleParentClick} className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                            <div className="relative modal-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                                {/* Aqui va la informacion */}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}