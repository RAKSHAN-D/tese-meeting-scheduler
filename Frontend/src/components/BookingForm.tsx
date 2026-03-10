import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Input } from "./ui";

interface BookingFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface BookingFormProps {
  selectedDateTimeLabel: string;
  timezoneLabel: string;
  meetLabel?: string;
  initialValues?: Partial<BookingFormValues>;
  isSubmitting?: boolean;
  onBack: () => void;
  onSubmit: (values: BookingFormValues) => void;
}

type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({
  selectedDateTimeLabel,
  timezoneLabel,
  meetLabel = "Google Meet",
  initialValues,
  isSubmitting = false,
  onBack,
  onSubmit,
}: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    email: initialValues?.email || "",
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});

  const validate = (): BookingFormErrors => {
    const nextErrors: BookingFormErrors = {};

    if (!values.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!values.lastName.trim()) nextErrors.lastName = "Surname is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!emailRegex.test(values.email.trim())) nextErrors.email = "Enter a valid email";

    return nextErrors;
  };

  const handleChange =
    (field: keyof BookingFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
    });
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 style={{ fontSize: 22, color: "#0f2027" }} className="font-semibold">
        Confirm your details
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Fill in your information to complete the booking.
      </p>

      <div
        className="mt-4 rounded-xl p-4"
        style={{ backgroundColor: "#f0fdfa", border: "1.5px solid #99f6e4" }}
      >
        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <p>
              <span className="mr-2">Date & time:</span> <span className="font-semibold text-slate-900">{selectedDateTimeLabel}</span>
            </p>
            <p className="pl-6 text-xs font-medium text-teal-700">{timezoneLabel}</p>
          </div>
          <p style={{ borderTop: "1px solid #ccfbf1" }} className="pt-3">
            <span className="mr-2">Location:</span> {meetLabel}
          </p>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            name="firstName"
            label="First name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
          />
          <Input
            name="lastName"
            label="Surname"
            value={values.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
          />
        </div>

        <Input
          name="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
        />

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <Button type="button" variant="outline" onClick={onBack} className="sm:w-auto">
            Back
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full transform shadow-[0_10px_20px_rgba(20,184,166,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(20,184,166,0.3)]"
          >
            Book Meeting
          </Button>
        </div>
      </form>
    </section>
  );
}

