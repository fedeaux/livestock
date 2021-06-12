import { withUpdateProjectDeliveryDate } from "somewhere";
import { CalendarInput } from "inputs/calendar";

function ProjectDeliveryDate({
  project,
}) {
  return (
    <div>
      <div>Only color, animation, design stuff</div>
      <CalendarInput
        name="deliveryDate"
        value={project.deliveryDate} // I don't want to need
        // to care about parseIso and stuff
        onChange={project.update} // I don't know details like event.target.value
        enabled={project.canUpdateField('deliveryDate')}
        // if currentUser.isAdmin or if !project.complete
      />
    </div>
  )
}

export default withUpdateProjectDeliveryDate(ProjectDeliveryDate);
