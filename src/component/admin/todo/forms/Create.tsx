import React from "react";
import { Modal, Button, FileInput, Textarea } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";

interface CreateValues {
  image: File | null;
  description: string;
}

interface CreateProps {
  opened: boolean;
  onClose: () => void;
}

const Create: React.FC<CreateProps> = ({ opened, onClose }) => {
  const form: UseFormReturnType<CreateValues> = useForm<CreateValues>({
    initialValues: {
      image: null,
      description: "",
    },

    validate: {
      image: (value) => (value ? null : "Image is required"),
      description: (value) => (value ? null : "Description is required"),
    },
  });

  const handleSubmit = (values: CreateValues) => {
    // Handle form submission
    console.log(values);

    // Example of how to handle file upload
    if (values.image) {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("description", values.description);

      // Send formData to the server using fetch or axios
      // fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch(error => console.error(error));
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Record" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          label="Image"
          placeholder="Upload image"
          {...form.getInputProps("image")}
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
        />

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="bg-blue-500 text-white border-none hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Create;
