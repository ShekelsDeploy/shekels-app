import React, {useState} from 'react';

export default function FileInputComponent(data:any) {

	const [theFile, setTheFile] = useState("");
	const handleInputFile = (e:any) => {
		const file = e.target.files[0];
		setTheFile(e.target.value);
		data = file;
	}
	return (
		<>		
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={"file_input"}>Upload file</label>
			<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
							id={"file_input"} 
							type="file"
							value={theFile}
							onChange={e => handleInputFile(e)}/>
			<label className="relative inline-flex items-center mb-4 cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer"/>
				<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Validated</span>
			</label>
		</>
	)

}