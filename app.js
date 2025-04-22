const { createApp } = Vue

createApp({
  data() {
    return {
      abogados: [],
      currentAbogado: {
        nombre: '',
        especialidad: '',
        email: '',
        telefono: '',
        imagen: ''
      },
      editMode: false,
      editIndex: -1,
      fileName: '',
      
      // Datos para el Manager
      isManagerLoggedIn: false,
      showLoginModal: false,
      loginForm: {
        username: '',
        password: ''
      },
      activeTab: 'especialidades',
      nuevaEspecialidad: '',
      especialidades: [
        'Derecho Civil',
        'Derecho Penal',
        'Derecho Laboral'
      ],
      
      // Para gráficos
      especialidadesChart: null
    }
  },
  
  mounted() {
    // Cargar datos del localStorage si existen
    this.loadFromLocalStorage()
    
    // Verificar si el administrador ya está logueado
    const isLoggedIn = localStorage.getItem('managerLoggedIn')
    if (isLoggedIn === 'true') {
      this.isManagerLoggedIn = true
    }
  },
  
  watch: {
    // Actualizar el gráfico cuando cambia la pestaña a estadísticas
    activeTab(newTab) {
      if (newTab === 'estadisticas') {
        this.$nextTick(() => {
          this.renderCharts()
        })
      }
    },
    
    // Actualizar el gráfico cuando cambian los abogados
    abogados: {
      handler() {
        if (this.activeTab === 'estadisticas' && this.isManagerLoggedIn) {
          this.$nextTick(() => {
            this.renderCharts()
          })
        }
      },
      deep: true
    }
  },
  
  methods: {
    saveAbogado() {
      if (this.editMode) {
        // Actualizar abogado existente
        this.abogados[this.editIndex] = { ...this.currentAbogado }
      } else {
        // Agregar nuevo abogado
        this.abogados.push({ ...this.currentAbogado })
      }
      
      // Guardar en localStorage
      this.saveToLocalStorage()
      
      // Resetear el formulario
      this.resetForm()
    },
    
    editAbogado(index) {
      this.editMode = true
      this.editIndex = index
      this.currentAbogado = { ...this.abogados[index] }
      this.fileName = this.currentAbogado.imagen ? 'Imagen actual' : ''
    },
    
    deleteAbogado(index) {
      if (confirm('¿Está seguro de que desea eliminar este abogado?')) {
        this.abogados.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    
    resetForm() {
      this.currentAbogado = {
        nombre: '',
        especialidad: '',
        email: '',
        telefono: '',
        imagen: ''
      }
      this.editMode = false
      this.editIndex = -1
      this.fileName = ''
    },
    
    saveToLocalStorage() {
      localStorage.setItem('abogados', JSON.stringify(this.abogados))
      localStorage.setItem('especialidades', JSON.stringify(this.especialidades))
    },
    
    loadFromLocalStorage() {
      // Cargar abogados
      const savedAbogados = localStorage.getItem('abogados')
      if (savedAbogados) {
        this.abogados = JSON.parse(savedAbogados)
      }
      
      // Cargar especialidades
      const savedEspecialidades = localStorage.getItem('especialidades')
      if (savedEspecialidades) {
        this.especialidades = JSON.parse(savedEspecialidades)
      }
    },
    
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      this.fileName = file.name
      
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Por favor, seleccione un archivo de imagen válido (JPEG, PNG, GIF, WEBP)')
        event.target.value = ''
        this.fileName = ''
        return
      }
      
      // Validar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es 2MB.')
        event.target.value = ''
        this.fileName = ''
        return
      }
      
      // Convertir la imagen a base64 para almacenarla
      const reader = new FileReader()
      reader.onload = (e) => {
        this.currentAbogado.imagen = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    // Métodos para el Manager
    showManagerLogin() {
      this.showLoginModal = true
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    
    loginManager() {
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'myok123') {
        this.isManagerLoggedIn = true
        localStorage.setItem('managerLoggedIn', 'true')
        this.showLoginModal = false
        
        // Si estamos en modo edición, cancelamos
        if (this.editMode) {
          this.resetForm()
        }
        
        // Renderizar gráficos después de login
        this.$nextTick(() => {
          this.renderCharts()
        })
      } else {
        alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.')
      }
    },
    
    logoutManager() {
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        this.isManagerLoggedIn = false
        localStorage.removeItem('managerLoggedIn')
        this.activeTab = 'especialidades'
      }
    },
    
    addEspecialidad() {
      if (this.nuevaEspecialidad.trim() === '') return
      
      // Verificar si ya existe
      if (this.especialidades.includes(this.nuevaEspecialidad)) {
        alert('Esta especialidad ya existe')
        return
      }
      
      this.especialidades.push(this.nuevaEspecialidad)
      this.nuevaEspecialidad = ''
      this.saveToLocalStorage()
    },
    
    deleteEspecialidad(index) {
      // Verificar si hay abogados con esta especialidad
      const especialidad = this.especialidades[index]
      const abogadosConEspecialidad = this.abogados.filter(a => a.especialidad === especialidad)
      
      if (abogadosConEspecialidad.length > 0) {
        alert(`No se puede eliminar esta especialidad porque hay ${abogadosConEspecialidad.length} abogado(s) asignado(s) a ella.`)
        return
      }
      
      if (confirm('¿Está seguro de que desea eliminar esta especialidad?')) {
        this.especialidades.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    
    renderCharts() {
      // Destruir el gráfico anterior si existe
      if (this.especialidadesChart) {
        this.especialidadesChart.destroy()
      }
      
      // Preparar datos para el gráfico de especialidades
      const especialidadesLabels = this.especialidades
      const especialidadesData = this.especialidades.map(esp => {
        return this.abogados.filter(a => a.especialidad === esp).length
      })
      
      // Colores para el gráfico
      const backgroundColors = [
        'rgba(197, 164, 126, 0.7)',
        'rgba(30, 36, 54, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(244, 67, 54, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(96, 125, 139, 0.7)',
        'rgba(233, 30, 99, 0.7)'
      ]
      
      // Crear el gráfico de especialidades
      const ctx = document.getElementById('especialidadesChart').getContext('2d')
      this.especialidadesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: especialidadesLabels,
          datasets: [{
            label: 'Número de Abogados',
            data: especialidadesData,
            backgroundColor: backgroundColors.slice(0, especialidadesLabels.length),
            borderColor: backgroundColors.slice(0, especialidadesLabels.length).map(color => color.replace('0.7', '1')),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Distribución de Abogados por Especialidad',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      })
    }
  }
}).mount('#app') 