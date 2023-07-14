import image1 from 'assets/home/work-us.jpg'
import FooterHome from 'pages/home/page/footer-page'
export default function AboutPage() {
    return (
        <>
            <h1 className="text-5xl text-center pt-20 pb-4">ABOUT SHEKELS</h1>
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: 'url("/img/card-left.jpg")' }} title="Woman holding a mug">
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            SHEKELS
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">Quienes somos</div>
                        <p className="text-gray-700 text-base font-medium">
                            Somos una App enfocada a conectar a nuestros estilistas con nuestros clientes, y tengan la comodidad de un servicio de belleza a domicilio.
                        </p>
                        <br />
                        <p className="text-gray-700 text-base font-medium">
                            Trabajamos para mejorar la comodidad de un servicio de belleza en el mundo
                            Embellecemos al mundo, eso es lo que mejor hacemos. Es nuestra esencia. Corre por nuestras venas. Es lo que nos saca de la cama cada mañana. Nos motiva a reinventar constantemente la forma de verte  mejor. Para ti. Siempre luzcas con un buen look. Recuerda que es parte de tu higiene. Y si te gusta embellecer a nuestros clientes es una de las formas en las que quieres generar ganancias. En tiempo real. A la increíble velocidad del presente.
                        </p>
                    </div>
                    <div className='pt-10'>
                        <img src={image1} alt="" className='rounded-lg'/>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-center pt-5 pb-4">Mision</h1>
            <div className="max-w-sm w-full lg:max-w-full">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: 'url("/img/card-left.jpg")' }} title="Woman holding a mug">
                </div>
                <div className="border-b border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                    <div className="mb-8">
                        <h1 className="text-gray-700 text-base font-medium text-center">
                            La misión de Shekels es brindar servicio de belleza, para todos, en todas partes.
                        </h1>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-center pt-5 pb-4">Vision</h1>
            <div className="max-w-sm w-full lg:max-w-full">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: 'url("/img/card-left.jpg")' }} title="Woman holding a mug">
                </div>
                <div className="border-b border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                    <div className="mb-8">
                        <p className="text-gray-700 text-base font-medium text-center">
                            Ser una app de belleza más inteligente y conectar a todos aquellos que no conocen una cd. por primera vez y no pierdan el tiempo buscando donde encontrar un servicio de belleza. Servicio de belleza más seguro, económico y confiable. App que crea oportunidad de trabajo para todos aquellos que tienen el Don de ser estilistas y barberos puedan trabajar en sus momentos libres y así puedan estar adquiriendo mejores ingresos.
                        </p>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-center pt-5 pb-4">Valores</h1>
            <div className="max-w-sm w-full lg:max-w-full">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: 'url("/img/card-left.jpg")' }} title="Woman holding a mug">
                </div>
                <div className="border-b border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                    <div className="mb-8">
                        <p className="text-gray-700 text-base font-medium text-center">
                            Compromiso para llegar a cumplir, con la mejor calidad nuestros servicios.
                        </p>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <FooterHome></FooterHome>
        </>
    )
}