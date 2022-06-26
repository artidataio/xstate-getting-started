import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

const promiseMachine = createMachine({
  id: "promise",
  initial: "pending",
  states: {
    pending: {
      on: {
        RESOLVE: { target: "resolved" },
        REJECT: { target: "rejected" }
      }
    },
    resolved: {
      type: "final"
    },
    rejected: {
      type: "final"
    }
  }
});

export default function App() {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div>
      {/** You can listen to what state the service is in */}
      {state.matches("pending") && <p>Loading...</p>}
      {state.matches("rejected") && <p>Promise Rejected</p>}
      {state.matches("resolved") && <p>Promise Resolved</p>}
      <div>
        {/** You can send events to the running service */}
        <button onClick={() => send("RESOLVE")}>Resolve</button>
        <button onClick={() => send("REJECT")}>Reject</button>
      </div>
    </div>
  );
}
