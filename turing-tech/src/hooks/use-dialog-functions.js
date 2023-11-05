/* eslint-disable react-hooks/rules-of-hooks */
import { FormProvider } from "react-hook-form";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useModal } from ".";

export const useDialogFunctions = ({
  query,
  queryName,
  mutation,
  mutationName,
  initialValues,
  queryMapper,
  mutationMapper,
  dialogConfig,
}) => {
  const { showDialog, hideDialog } = useModal();

  let mutationFn, fetchData;
  if (mutation && mutationName) {
    const [callMutation] = useMutation(mutation);
    mutationFn = callMutation;
  }

  if (query && queryName) {
    const [callQuery] = useLazyQuery(query, { fetchPolicy: "no-cache" });
    fetchData = callQuery;
  }

  const methods = useForm({
    defaultValues: initialValues,
    mode: "all",
  });

  const retrieveData = async (queryVariables) => {
    if (query && queryName) {
      const response = await fetchData({ variables: { ...queryVariables } });
      const formInput = queryMapper(response?.data?.[queryName]);
      methods.reset({ formInput });
    }
  };

  const saveData = async () => {
    try {
      await mutationFn({
        variables: { input: { ...mutationMapper(methods.getValues()) } },
      });
    } catch {
      //error
    }
  };

  const onShowDialog = (variables, retrieveOnOpen = false) => {
    if (query && retrieveOnOpen) {
      retrieveData(variables);
    }

    showDialog({
      header: dialogConfig?.title,
      component: (
        <FormProvider {...methods}>
          <dialogConfig.component variables={variables} />
        </FormProvider>
      ),
      onSubmit: () => {
        methods.handleSubmit(() => {
          if (mutation && mutationName) {
            saveData();
          }
          hideDialog();
          methods.reset(initialValues);
        })();
      },
      onClose: () => {
        hideDialog();
        methods.reset(initialValues);
      },
      maxWidth: dialogConfig.maxWidth ?? "lg",
      primaryButtonText: dialogConfig.primaryButtonText,
      secondaryButtonText: dialogConfig.secondaryButtonText,
    });
  };

  return { onShowDialog, methods };
};
