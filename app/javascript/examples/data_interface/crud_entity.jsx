import { withCreateProjectApi } from "somewhere";
import { withGetProjectIndex } from "probably/somewhere/else";

function CreateProjectButton({
  canCreateProject,
  createProject
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      {
        !showForm && canCreateProject &&
          <Button onClick={() => { setShowForm(true) }} > New Project </Button>
      }
      {showForm && <ProjectForm save={createProject} />}
    </div>
  )
}

export default withCreateProjectApi(CreateProjectButton);

function ProjectForm({ project, save, isValid }) {
  const onSave = useCallback(() => {
    save(project)
  });

  return (
    <>
      <ProjectFields
        project={project}
        errors={errors}
      />
      <Button
        enabled={isValid}
        onClick={onSave}
      />
    </>
  )
}

export withProjectForm(ProjectForm)

function ProjectFields({ project }) {
  return (
    <>
      <FormTextField
        name="title"
        value={project.title}
        label={project.attributes.title.label}
        onChange={onChange}
        errors={project.errors.title}
      />
      <ProjectDeliveryDate
        project={project}
        onChange={onChange}
      />
    </>
  )
}

function FormTextField({ name, value, label, errors, onChange }) {
  const onInputChange = useCallback((value) => {
    onChange({ [name]: value });
  });

  return (
    <FieldWrapper errors={errors}>
      <FieldLabel>{label}</FieldLabel>
      <TextInput value={value}></TextInput>
    </FieldWrapper>
  )
}

export default withCrudProjectCollection(ProjectCollection);
