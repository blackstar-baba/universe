#### description

#### form

##### ComponentLife

```
constructor(can init formgroup here) ->Input -> ngOnInit ->writeValue->registerOnChange
```

##### propagateChange

when update view , use propagateChange send value from child component to father component.

##### writeValue

- Do not emitEvent when use patchValue method for xxGroup except you know what you‘re doing.

##### form component init value send

- Use EventEmitter in writeValue
- send propagateChange  in registerOnChange method

##### setter

- use setter which has annotation input can do something when value changed

  ```
  private schedulerJobType: string;
  
  get jobType(): string {
  return this.schedulerJobType;
  }
  
  @Input()
  set jobType(value) {
  this.schedulerJobType = value;
  this.reset();
  }
  ```

##### Validate
- child component send  propagateChange event `null` to father, father can match component Validator rule `Validators.required` 
- Some components fail to validate, maybe not because of a problem with them, but because some methods fail to run.

##### Emitter
child component add
```
@Output()
refChanged = new EventEmitter<EntityId>();

#### if need send
this.refChanged.emit(value)
```
fatch component set in html
```
(refChanged)="xx($event)"
```



#### link

