import { useRef, useState } from 'react'
import { Stack, Image, Center } from '@chakra-ui/react'

interface FileUploaderProps {
  accept?: string
  placeholder?: string
  onChange?: (file: File) => void
  onError?: (message: string) => void
  initialValue?: File
  field?: { name: string; value: File }
  form?: {
    setFieldValue: (name: string, value: File) => void
    setFieldTouched: (name: string, value: boolean) => void
  }
}

export default function FileUploader(props: FileUploaderProps) {
  const { name, value } = props.field || {}
  const { setFieldValue, setFieldTouched } = props.form || {}

  const [file, setFile] = useState<File>(value || props.initialValue || null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Function to store file in state when user uploads it
  const uploadFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click()

      fileInputRef.current.onchange = () => {
        setFieldTouched?.(name, true)
        if (fileInputRef?.current?.files?.length) {
          const file = fileInputRef.current.files[0]
          setFile(file)
          setFieldValue?.(name, file)
        }
      }
    }
  }

  return (
    <Stack>
      {file ? (
        <Image
          alt="nft-img"
          src={URL.createObjectURL(file)}
          cursor="pointer"
          maxH={'80'}
          borderRadius="2xl"
          objectFit="contain"
          onClick={() => {
            setFile(undefined)
            setFieldValue?.(name, undefined)
          }}
        />
      ) : (
        <Center
          minH={20}
          border={'1px dashed grey;'}
          onClick={uploadFile}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            setFile(e.dataTransfer.files[0])
          }}
        >
          Drag and drop an image here to upload it!
        </Center>
      )}
      <input
        type="file"
        accept={props.accept}
        id="profile-picture-input"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </Stack>
  )
}
