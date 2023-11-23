import { Button, Grid, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider } from "@components";
import { AddFormData, AddFormDataValue } from "./calls.data";
import { useState } from "react";
import { useAddNoteMutation } from "@services/calls-api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

export function AddNote({
  submitLabel,
  apiData,
}: {
  submitLabel?: string;

  apiData?: any;
}): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const updateData: any = {};

  for (const keys in apiData) {
    updateData[keys] = apiData[keys];
    if (keys === "allowedCompany") {
      updateData[keys] = apiData[keys].map((item: any, index: number) => {
        return { id: index + 1, name: item, value: item };
      });
    }
    if (keys === "address") {
      updateData.addressUpdate = `${apiData[keys].addressLine} ${apiData[keys].city} ${apiData[keys].country}`;
    }
  }

  const methods = useForm({
    defaultValues: apiData ? updateData : AddFormDataValue,
    //  resolver: yupResolver(formSchemaModel),
  });
  //API HANDLERS
  const [createCompanyUser, { isLoading }] = useAddNoteMutation();
  const { control, handleSubmit } = methods;

  async function onSubmit(data: any): Promise<any> {
    try {
      const { message } = await createCompanyUser({
        body: {
          userId: data._id,
        },
      }).unwrap();
      toast.success(message || "Company user created successfully");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "error occur");
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        variant="contained"
        sx={{ px: 1, py: 0.5 }}
      >
        Add Note
      </Button>

      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Add Note"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {AddFormData.map((form: any) => (
              <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                <form.component control={control} disabled {...form.RhfValue} />
              </Grid>
            ))}
            <Grid xs={12} item>
              <Box mt={1} display="flex">
                <Box
                  ml="auto"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      height: 35,
                    }}
                    type="submit"
                  >
                    {submitLabel ? submitLabel : "Add"}
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
