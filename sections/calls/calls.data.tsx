import { RHFAutocompleteSync, RHFTextField } from "@components";
import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      label: "FirstName",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 6,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      label: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 6,
    RhfValue: {
      name: "businessName",
      fullWidth: true,
      label: "Business Name",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      name: "workEmail",
      fullWidth: true,
      label: "Business Email",
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      name: "contactNumber",
      fullWidth: true,
      label: "Phone No",
    },
    component: RHFTextField,
  },
  {
    id: 6,
    grid: 6,
    RhfValue: {
      name: "companySize",
      fullWidth: true,
      label: "No of employee",
    },
    component: RHFTextField,
  },
  {
    id: 7,
    grid: 6,
    RhfValue: {
      multiple: true,
      name: "allowedCompany",
      fullWidth: true,
      label: "Select Product",
      options: [
        { id: 1, name: "PERFORMANCE", value: "PERFORMANCE" },
        { id: 2, name: "ONBOARDING", value: "ONBOARDING" },
        { id: 3, name: "RECRUITMENT", value: "RECRUITMENT" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 8,
    grid: 6,
    RhfValue: {
      name: "address.city",
      fullWidth: true,
      label: "City",
    },
    component: RHFTextField,
  },
  {
    id: 9,
    grid: 6,
    RhfValue: {
      name: "address.zipCode",
      fullWidth: true,
      label: "Postal Code",
    },
    component: RHFTextField,
  },
  {
    id: 10,
    grid: 6,
    RhfValue: {
      name: "addressUpdate",
      fullWidth: true,
      label: "Address",
    },
    component: RHFTextField,
  },
];
export const AddFormDataValue = {
  fullName: "",
  lastName: "",
  businessName: "",
  businessEmail: "",
  phoneNo: "",
  noOfEmployess: "",
  selectProduct: null,
  city: "",
  postalCode: "",
};

export const formSchemaModel = Yup.object().shape({
  fullName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  businessName: Yup.string().required("required"),
  businessEmail: Yup.string().required("required"),
  phoneNo: Yup.string().required("required"),
  noOfEmployess: Yup.string().required("required"),
  selectProduct: Yup.string().required("required"),
  city: Yup.string().required("required"),
  postalCode: Yup.string().required("required"),
});
