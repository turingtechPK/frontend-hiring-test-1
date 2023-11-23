import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomModal, FormProvider, RHFTextField } from "@components";
import { addDefaultValues, schema } from "./calls.data";
import { useState } from "react";
import { useAddNoteMutation } from "@services/calls-api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFormattedDuration } from "@utils";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AddNote({ apiData }: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);

  const methods = useForm({
    defaultValues: addDefaultValues,
    resolver: yupResolver(schema),
  });

  //API HANDLERS
  const [mutation, { isLoading }] = useAddNoteMutation();
  const { control, handleSubmit } = methods;

  async function onSubmit({ content }: any): Promise<any> {
    try {
      const { message } = await mutation({
        body: {
          content,
        },
        params: {
          callId: apiData?.id,
        },
      }).unwrap();
      toast.success(message || "Add Note Successfully");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }

  const data = [
    { name: "Call Id", value: apiData?.id },
    { name: "Call Type", value: capitalizeFirstLetter(apiData?.call_type) },
    { name: "Duration", value: getFormattedDuration(apiData?.duration) },
    { name: "To", value: apiData?.to },
    { name: "From", value: apiData?.from },
    { name: "Via", value: apiData?.via },
  ];

  const DataDisplay = () => {
    return (
      <Stack spacing={1.5}>
        {data.map((item) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
              }}
            >
              {item?.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        variant="contained"
        sx={{ py: 0.5, px: 1 }}
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
          <Grid container px={1}>
            <Divider />
            <Grid item container xs={12} rowGap={2} sx={{ py: 2 }}>
              <Grid xs={12}>
                <DataDisplay />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  name="content"
                  outerLabel="Note"
                  placeholder="Add Note"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid xs={12} item>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                fullWidth={true}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </>
  );
}
