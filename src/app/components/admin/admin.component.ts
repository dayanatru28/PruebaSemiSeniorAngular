import { Component } from '@angular/core';
import { taskDTO } from '../../models/task.dto';
import { CommonModule } from '@angular/common';
import { AdminTaskService } from '../../services/admin-task.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {

  //Arreglo en el que se van a guardar todas las tareas de servicio
  tasks: taskDTO[] = [];

  formTasks: FormGroup;

  //Variable con la cual se sabe si es formulario será de actualizar o por el contrario de crear una nueva tarea
  //Con el fin de reutilizar el codigo
  isUpdate: boolean = false;
  mensaje: string = '';
  mostrarModal = false;

  //Almacena los valores de la seleccion de una tarea en especifico
  tareaSeleccionada: taskDTO | null = null;

  // Estado inicial del filtro
  filtroEstado: string = 'todas';


  //Se inicializa el servicio y el formulario
  constructor(private taskService: AdminTaskService,
    private fb: FormBuilder,
  ) {
    //Formulario que recibe los campos a almacenar
    this.formTasks = this.fb.group({
      id: ['', [Validators.required]],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      completado: [false]
    });
  }

  ngOnInit() {
    //Se utiliza para listar en primera instancia las tareas existentes
    this.listarTareas();
  }


  //Metodo para listar tareas
  listarTareas() {
    this.taskService.getTareas().subscribe(resp => {
      if (resp) {
        this.tasks = resp;
      }
    });
  }


  abrirModal() {
    this.isUpdate = false; // Indica que es una nueva tarea
    this.tareaSeleccionada = null; // Limpia cualquier tarea previa seleccionada
    this.formTasks.reset(); // Reinicia el formulario
    this.mostrarModal = true; // Muestra el modal
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.formTasks.reset();
  }

  //Modifica el estado de una tarea en especifico
  actualizarCompletado(event: Event) {
    //Se recibe el evento de cuando ek usuario interactua con el checkbox
    const checked = (event.target as HTMLInputElement).checked;
    this.formTasks.patchValue({ completado: checked });
  }

  // Guardar nueva tarea
  agregarTarea() {
    if (this.formTasks.valid) {
      //Aunque el codigo en el front tiene que ser un valor numero, se convirte a string antes porque el servicio viene estructado de esa forma
      const nuevaTarea = { ...this.formTasks.value, id: String(this.formTasks.value.id) };
      this.taskService.agregarTarea(nuevaTarea).subscribe(() => {
        this.listarTareas();
        this.cerrarModal(); // Cierra el modal
      });
    }
  }

  // Cargar datos de la tarea en el formulario para editarla
  editarTarea(task: any) {
    this.isUpdate = true; // Modo edición
    this.tareaSeleccionada = task; // Guarda la tarea seleccionada
    this.formTasks.patchValue(task); // Llena el formulario con la tarea seleccionada
    this.mostrarModal = true;
  }

  actualizarTarea() {
    if (this.formTasks.valid && this.tareaSeleccionada) {
      //Se utiliza el partial por si algunos valores se almacenan de forma nula, solo los que se necesitan
      const tareaActualizada: Partial<taskDTO> = this.formTasks.value;
      this.taskService.actualizarTarea(this.tareaSeleccionada.id, tareaActualizada)
        .subscribe(() => {
          this.listarTareas(); // Recargar lista de tareas
          this.cerrarModal();  // Cerrar modal
        });
    }
  }

  //Mensaje de alerta
  mostrarAlerta(titulo: string, mensaje: string, tipo: 'success' | 'error') {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonColor: '#3085d6',
    });
  }

  //Mensaje de eliminar
  eliminarTarea(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.eliminarTarea(id).subscribe(() => {
          Swal.fire({
            title: 'Eliminado',
            text: 'La tarea ha sido eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
          this.listarTareas();
        }, error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la tarea.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
          console.error("Error al eliminar la tarea", error);
        });
      }
    });
  }


  //Creacion de una funcion para filtrar las tareas por estado
  get tareasFiltradas() {
    return this.tasks.filter(task => {
      if (this.filtroEstado === 'completadas') return task.completado;
      if (this.filtroEstado === 'pendientes') return !task.completado;
      return true; // Si es "todas", muestra todas
    });
  }

  //Metodo para actualizar el estado
  actualizarEstado(task: any) {
    //Crea una copia de la tarea seleccionada y cambia al estado contrario con el que se encuetra
    // ... clona el objeto
    const tareaActualizada = { ...task, completado: !task.completado };
    //Llama al servicio para actualizar la tarea 
    this.taskService.actualizarTarea(task.id, tareaActualizada).subscribe(
      (respuestaActualizada) => {
        task.completado = respuestaActualizada.completado; 
      },
      error => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

}
