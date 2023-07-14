export default function DashboardCard({ title, children }: any) {
    return (
        <>
            <div>
                <div><h2 className="text-center font-semibold">{title}</h2></div>
                <div className="bg-white rounded-lg px-2 h-72 mt-2 border-solid border border-gray-300 hover:cursor-pointer">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}