"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
	aspectRatioOptions,
	defaultValues,
	transformationTypes,
} from "@/constants";
import { CustomField } from "./CustomField";
import { useState } from "react";
import { AspectRatioKey } from "@/lib/utils";
import { Button } from "../ui/button";

export const formSchema = z.object({
	title: z.string(),
	aspectRatio: z.string().optional(),
	color: z.string().optional(),
	prompt: z.string().optional(),
	publicId: z.string(),
});

const TransformationForm = ({
	action,
	data = null,
	userId,
	type,
	creditBalance,
	config = null,
}: TransformationFormProps) => {
	const [image, setImage] = useState(data);
	const [newTransformation, setNewTransformation] =
		useState<Transformations | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isTransforming, setIsTransforming] = useState(false);
	const [transformationConfig, setTransformationConfig] = useState(config);
	const transformationType = transformationTypes[type];
	const initialValues =
		data && action === "Update"
			? {
					title: data.title,
					aspectRatio: data.aspectRatio,
					color: data.color,
					prompt: data.prompt,
					publicId: data.publicId,
			  }
			: defaultValues;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const onSelectFiledHandler = (value: string, onChangeField: () => void) => {};

	function onInputChangeHandler(
		fieldName: string,
		type: string,
		onChangeField: (value: string) => void,
		value: string
	): void {}

	function onTransformHandler(): void {
		throw new Error("Function not implemented.");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<CustomField
					control={form.control}
					name="title"
					formLabel="Image Title"
					className="w-full"
					render={({ field }) => <Input {...field} className="input-field" />}
				/>
				{type === "fill" && (
					<CustomField
						control={form.control}
						name="aspectRatio"
						formLabel="Aspect Ratio"
						className="w-full"
						render={({ field }) => (
							<Select>
								<SelectTrigger className="select-field">
									<SelectValue placeholder="Select size" />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(aspectRatioOptions).map((key) => (
										<SelectItem key={key} value={key} className="select-item">
											{aspectRatioOptions[key as AspectRatioKey].label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				)}
				{(type === "remove" || type === "recolor") && (
					<div className="prompt-field">
						<CustomField
							control={form.control}
							name="prompt"
							formLabel={
								type === "remove" ? "Object to remove" : "Object to recolor"
							}
							className="w-full"
							render={({ field }) => (
								<Input
									{...field}
									className="input-field"
									value={field.value}
									onChange={(e) => {
										onInputChangeHandler(
											"prompt",
											type,
											field.onChange,
											e.target.value
										);
									}}
								/>
							)}
						/>
					</div>
				)}
				{type === "recolor" && (
					<CustomField
						name="color"
						formLabel="Replacement Color"
						className="w-full"
						render={({ field }) => (
							<Input
								className="input-item"
								onChange={(e) =>
									onInputChangeHandler(
										"color",
										"recolor",
										field.onChange,
										e.target.value
									)
								}
							/>
						)}
						control={form.control}
					/>
				)}
				<div className="flex flex-col gap-4">
					<Button
						type="button"
						className="submit-button"
						disabled={isTransforming || newTransformation === null}
						onClick={onTransformHandler}
					>
						{isTransforming ? "Transforming" : "Apply transformation"}
					</Button>
				</div>
				<Button
					type="submit"
					className="submit-button capitalize"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting" : "Save"}
				</Button>
			</form>
		</Form>
	);
};

export default TransformationForm;
