import { Info,Trash } from 'phosphor-react'
import {File} from 'lucide-react'
import { useCallback, useState } from 'react'
import { Upload, UploadBody, UploadFooter, UploadIcon, UploadText } from 'keep-react'

export const UploadComponent = (onSubmit) => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, [])

  const handleUpload = () => {
    if (files.length > 0) {
      onSubmit(files); // Call the passed function with the selected files
    } else {
      alert('Please upload a file first!');
    }
  };

  return (
    <Upload options={{ onDrop }}>
      <UploadBody>
        <UploadIcon>
          <File height={28} width={28} />
        </UploadIcon>
        <UploadText>
          <p className="text-body-3 font-medium text-metal-600 dark:text-white">Drag & Drop or Choose File to Upload</p>
          <p className="text-body-4 font-normal text-metal-400 dark:text-metal-300">
            DOCX, XLSX, PPTX, PDF, and JPG formats, up to 50 MB.
          </p>
        </UploadText>
      </UploadBody>
      <UploadFooter isFileExists={files.length > 0}>
        <p className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600 dark:text-metal-300">
          <Info size={16} />
          Uploaded Files
        </p>
        <ul className="space-y-1">
          {files?.map((file) => (
            <li
              key={file?.name}
              className="flex items-center justify-between border-l-4 border-l-metal-100 bg-metal-25 px-4 py-2.5 text-left text-body-4 font-normal capitalize text-metal-600 dark:border-l-metal-600 dark:bg-metal-800 dark:text-metal-300 ">
              {file?.name}
              <Trash size={16} color="red" />
            </li>
          ))}
        </ul>
      </UploadFooter>
    </Upload>
  )
}

