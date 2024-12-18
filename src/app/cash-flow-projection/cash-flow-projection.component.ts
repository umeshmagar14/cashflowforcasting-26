import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-flow-projection',
  templateUrl: './cash-flow-projection.component.html',
  styleUrls: ['./cash-flow-projection.component.scss']
})
export class CashFlowProjectionComponent {
  projectionForm: FormGroup;
  isDrawerOpen = false;
  accounts = [
    { id: "acc1", name: "Main Operating Account", type: 'operating' },
    { id: "acc2", name: "European Operations", type: 'operating' },
    { id: "acc3", name: "Investment Portfolio A", type: 'investment' },
    { id: "acc4", name: "Investment Portfolio B", type: 'investment' },
    { id: "acc5", name: "Emergency Reserve", type: 'reserve' },
    { id: "acc6", name: "Strategic Reserve", type: 'reserve' },
  ];

  constructor(private fb: FormBuilder) {
    this.projectionForm = this.fb.group({
      account: ['', Validators.required],
      type: ['receivable', Validators.required],
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectionForm.valid) {
      console.log(this.projectionForm.value);
      this.isDrawerOpen = false;
    }
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}