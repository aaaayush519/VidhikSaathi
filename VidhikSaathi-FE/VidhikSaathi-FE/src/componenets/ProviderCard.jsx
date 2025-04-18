function ProviderCard({provider}){
    return(
        <div className="bg-cyan shadow-md rounded-2xl flex flex-col p-4 gap-2 w-60 bg-sky-100">
            <p className="text-2xl font-semibold text-blue-800 text-center">{provider.name}</p>
            <p className="text-lg text-gray-600 text-center">📞{provider.phone}</p>
            <p className="text-lg text-center">{provider.email}</p>
            <p className="text-lg text-center">{provider.expertise}</p>
            <p className="text-lg text-gray-600 text-center">BarId:{provider.barRegistrationNumber}</p>
            <p className="text-lg text-center">⭐{provider.rating}</p>
        </div>
    )
}
export default ProviderCard;