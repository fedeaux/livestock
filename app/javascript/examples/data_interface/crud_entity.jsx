import { withCreateProjectApi } from "somewhere";
import { withGetProjectIndex } from "probably/somewhere/else";

function ProjectCollection({
  projects,
  canCreateProject,
  createProject
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <div>
        {
          projects.map((project) => {
            return <ProjectListItem project={project} />;
          })
        }
      </div>
      {showForm && <ProjectForm save={createProject} />}
      {
        !showForm && canCreateProject &&
          <Button onClick={() => { setShowForm(true) }} > New Project </Button>
      }
    </div>
  )
}

export default withGetProjectIndex(withCreateProjectApi(ProjectCollection));


function ProjectForm({ project, save }) {
  const onSave = useCallback(() => {
    save(project)
  });

  return (
    <>
      <ProjectFields
        project={project}
        onChange={project.change}
      />
      <Button
        enabled={project.isValid}
        onClick={onSave}
      />
    </>
  )
}

function ProjectFields({ project, onChange }) {
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
