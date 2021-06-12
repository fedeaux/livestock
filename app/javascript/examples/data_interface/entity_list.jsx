export default function ProjectListItem({
  project,
}) {
  return (
    <div>
    <div>{project.title}</div>
      <ProjectDeliveryDate
        project={project}
      />
    </div>
  );
}
