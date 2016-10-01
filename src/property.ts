import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class Property<T> extends BehaviorSubject<T> {

    constructor(private initialValue: T) {
        super(initialValue);
    }

    public reset(): void {
        this.next(this.initialValue);
    }

    public isDirty(): Observable<boolean> {
        return this.map(currentValue => _.isEqual(currentValue, this.initialValue));
    }

    public next(value: T): void {
        if (_.isEqual(this.getValue(), value)) {
            return;
        }

        super.next(value);
    }
}
