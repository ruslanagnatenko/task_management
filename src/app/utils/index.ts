export type Status = "NEW" | "IN PROGRESS" | "DONE";
export type Priority = 'LOW' | 'HIGH' | 'MIDDLE'

export default class Task {
    id: string;
    description: string;
    status: Status;
    priority: Priority

    constructor(
        description: string,
        status: Status = 'NEW',
        priority: Priority = 'MIDDLE',
        id: string = new Date().toISOString()
    ) {
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.id = id;
    }

    updateStatus(newStatus: Status) {
        this.status = newStatus;
    }

    updatePriority(newPriority: Priority) {
        this.priority = newPriority;
    }

    updateDescription(newDesc: string) {
        this.description = newDesc;
    }

    toJSON() {
        return {
            ...this,
            methods: {
                updateStatus: this.updateStatus,
                updatePriority: this.updatePriority,
                updateDescription: this.updateDescription,
            },
        };
    }
}

export const taskType = new Task('');

export type TTask = typeof taskType;
