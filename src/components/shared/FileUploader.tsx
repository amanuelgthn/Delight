import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setfile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    const onDrop = useCallback(
      (acceptedFiles: FileWithPath[]) => {
      setfile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file]);
    
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
        }
      })
  // <> </>react fragment for file displayer that is going to be posted
  return (
    <div {...getRootProps()} className="flex flex-center flex-col 
        bg-dark-3 rounded-x1 cursor-pointer">
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ? (
          <> 
            <div>
              <img src={fileUrl}
                    alt="image"
                    className='file_uploader-img'
                    />
            </div>
            <p className='file_uploader-label'><strong>Click or drag photo to replace</strong></p>
          </>
        ) : (
          <div className='file_uploader-box'>
            <img src="/assets/icons/file-upload.svg" width={100} 
                 alt="file-upload" />
            <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag Photo Here</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
            <Button type="button" className='shad-button_dark_4'>
              Select from computer
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader