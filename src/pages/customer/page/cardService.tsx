export default function CardService({ logo, text, handlerService }: any) {
    return (
        <>
            <div className="rounded-lg bg-gray-200 p-3" onClick={() => handlerService(text)}>
                <h3 className="font-semibold text-right text-xl">{text}</h3>
                <img className="object-fill h-24" src={logo} alt="" />
            </div>
        </>
    );
}