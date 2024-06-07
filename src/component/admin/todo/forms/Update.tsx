import React, { useEffect } from "react";
import { Modal, Button, FileInput, Textarea } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";

interface CreateValues {
  image: File | null;
  description: string;
}

interface CreateProps {
  opened: boolean;
  onClose: () => void;
  initialData: {
    image: File | null;
    description: string;
  } | null; // Allow initialData to be null or undefined
}

const Update: React.FC<CreateProps> = ({ opened, onClose, initialData }) => {
  const form: UseFormReturnType<CreateValues> = useForm<CreateValues>({
    initialValues: {
      image: initialData?.image || null,
      description: initialData?.description || "",
    },

    validate: {
      image: (value) => (value ? null : "Image is required"),
      description: (value) => (value ? null : "Description is required"),
    },
  });

  useEffect(() => {
    // Handle updates to initialData
    if (initialData) {
      form.setValues({
        image: initialData.image || null,
        description: initialData.description || "",
      });
    }
  }, [initialData]); // Run this effect when initialData changes

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
    <Modal opened={opened} onClose={onClose} title="Update Record" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          label="Image"
          placeholder="Upload image"
          accept="image/*"
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

export default Update;
