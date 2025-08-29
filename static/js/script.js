// Chart colors
const colors = {
    important: '#e74c3c',
    personal: '#2ecc71',
    promotion: '#f39c12',
    spam: '#9b59b6',
    work: '#3498db',
    nb: '#fda085',
    svm: '#b490ca'
};

// Initialize all charts
function initCharts(nbData, svmData) {
    // Accuracy Comparison Chart
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    new Chart(accuracyCtx, {
        type: 'bar',
        data: {
            labels: ['Naive Bayes', 'SVM'],
            datasets: [{
                label: 'Accuracy',
                data: [nbData.accuracy, svmData.accuracy],
                backgroundColor: [colors.nb, colors.svm],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // F1 Score Comparison Chart
    const f1Ctx = document.getElementById('f1Chart').getContext('2d');
    new Chart(f1Ctx, {
        type: 'bar',
        data: {
            labels: ['Naive Bayes', 'SVM'],
            datasets: [{
                label: 'Macro Avg F1-Score',
                data: [nbData.macro_avg, svmData.macro_avg],
                backgroundColor: [colors.nb, colors.svm],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // NB Precision Chart
    const nbPrecisionCtx = document.getElementById('nbPrecisionChart').getContext('2d');
    new Chart(nbPrecisionCtx, {
        type: 'bar',
        data: {
            labels: nbData.classes,
            datasets: [{
                label: 'Precision',
                data: nbData.precision,
                backgroundColor: [colors.important, colors.personal, colors.promotion, colors.spam, colors.work],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // NB Recall Chart
    const nbRecallCtx = document.getElementById('nbRecallChart').getContext('2d');
    new Chart(nbRecallCtx, {
        type: 'bar',
        data: {
            labels: nbData.classes,
            datasets: [{
                label: 'Recall',
                data: nbData.recall,
                backgroundColor: [colors.important, colors.personal, colors.promotion, colors.spam, colors.work],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // SVM Precision Chart
    const svmPrecisionCtx = document.getElementById('svmPrecisionChart').getContext('2d');
    new Chart(svmPrecisionCtx, {
        type: 'bar',
        data: {
            labels: svmData.classes,
            datasets: [{
                label: 'Precision',
                data: svmData.precision,
                backgroundColor: [colors.important, colors.personal, colors.promotion, colors.spam, colors.work],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // SVM Recall Chart
    const svmRecallCtx = document.getElementById('svmRecallChart').getContext('2d');
    new Chart(svmRecallCtx, {
        type: 'bar',
        data: {
            labels: svmData.classes,
            datasets: [{
                label: 'Recall',
                data: svmData.recall,
                backgroundColor: [colors.important, colors.personal, colors.promotion, colors.spam, colors.work],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Model Comparison Radar Chart
    const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
    new Chart(comparisonCtx, {
        type: 'radar',
        data: {
            labels: ['Precision', 'Recall', 'F1-Score', 'Accuracy'],
            datasets: [
                {
                    label: 'Naive Bayes',
                    data: [
                        nbData.weighted_avg, 
                        nbData.macro_avg, 
                        nbData.macro_avg, 
                        nbData.accuracy
                    ],
                    backgroundColor: 'rgba(253, 160, 133, 0.2)',
                    borderColor: colors.nb,
                    pointBackgroundColor: colors.nb
                },
                {
                    label: 'SVM',
                    data: [
                        svmData.weighted_avg, 
                        svmData.macro_avg, 
                        svmData.macro_avg, 
                        svmData.accuracy
                    ],
                    backgroundColor: 'rgba(180, 144, 202, 0.2)',
                    borderColor: colors.svm,
                    pointBackgroundColor: colors.svm
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + (context.raw * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });
}