/**
 * Angular.js App
 */

/**
 * TODO: Empty messages glow red form control
 * TODO: Zoom/pan word bubble
 * TODO: Come up with another top block thing
 * TODO: Another graph
 * TODO: Text classification
 * TODO: Fix title
 * TODO: Refactor
 * TODO: View all entries
 * TODO: Fix datatable on login (no data)
 * TODO: Edit login and register css
 * TODO: Add profile edit options
 */

var app = angular.module("dashboardApp", []);
app.controller("dashboardCtrl", function ($scope) {
    // //Video recording
    // var video = document.querySelector("#videoElement");
    //
    // (function() {
    //     var $image = $("#capturedimage");
    //     var video = $("#videoElement").get(0);
    //
    //     var getImage = function() {
    //         var canvas = document.createElement("canvas");
    //         canvas.getContext('2d')
    //             .drawImage(video, 0, 0, canvas.width, canvas.height);
    //
    //         var img = document.createElement("img");
    //         img.src = canvas.toDataURL();
    //         $image.prepend(img);
    //     };
    //
    //     $("#take-pic").click(getImage);
    // })();
    //
    //
    // if (navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices.getUserMedia({ video: true })
    //         .then(function (stream) {
    //             video.srcObject = stream;
    //         })
    //         .catch(function (err0r) {
    //             console.log("Something went wrong!");
    //         });
    // }

    /** MyScript Handwriting Recognition **/
    const editorElement = document.getElementById('editor');
    const configuration = {
        recognitionParams: {
            type: 'TEXT',
            protocol: 'WEBSOCKET',
            apiVersion: 'V4',
            server: {
                applicationKey: 'b62eb6b0-53c7-4004-bd95-8a824c6fcd7e',
                hmacKey: '572eac2b-be25-43d8-a16e-204ed2076ef4'
            }
        }
    };
    MyScript.register(editorElement, configuration);
    editorElement.addEventListener('exported', function (evt) {
        var exports = evt.detail.exports;
        if (exports && exports['text/plain']) {
            $("#comment").val(exports['text/plain']);
        }
    });


    // Angular Vars
    $scope.totalEntries = 0;
    $scope.totalUniqueWords = 0;
    $scope.totalWords = 0;
    $scope.consecutiveDays = 0;
    $scope.value = 0;
    $scope.status = "";

    // Other vars
    let wordFrequencies = {};
    let currentUser;

    $scope.logout = function () {
        console.log("LOGGING OUT");
        firebase.auth().signOut();
    };

    // Your web app's Firebase configuration
    fetch('/firebaseKey')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
        firebase.initializeApp(data);
        initOnAuth();
    });

    function initOnAuth() {
        firebase.auth().onAuthStateChanged(function (user) {

            if (!user) {
                window.location = 'index.html';
            } else {
                // Populate everything
                currentUser = user;
                console.log(user);

                //$("#user-name-span").text(user.displayName);
                $scope.name = user.displayName;
                $scope.$apply();

                repopulateTable(true);
                updateStats();
            }
        });
    }

    $('#form-submit').click(function () {
        // get all the inputs into an array.
        var $inputs = $('#add-log :input');

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        let emptyFlag = false;
        $inputs.each(function () {
            values[this.name] = $(this).val();
            if ($(this).val() == "") {
                emptyFlag = true;
                return;
            }
        });

        if (emptyFlag) {
            alert("Don't post empty messages!");
        }

        values['uid-val'] = currentUser.uid;

        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(function (response) {
            console.log(response);
            //repopulateTable();

            $("#inputDate").val("");
            $("#inputTitle").val("");
            $("#comment").val("");

            updateStats();
        })
    });


    function updateStats() {
        fetch('/getData')
            .then(function (response) {
                return response.json();
            }).then(function (data) {

            // Total entries
            $scope.totalEntries = Object.values(data[currentUser.uid]).length;
            $scope.totalWords = 0;

            wordFrequencies = {};

            for (let obj of Object.values(data[currentUser.uid])) {
                // Total words
                $scope.totalWords += obj["entry-words"];

                // Word frequency
                wordFrequencies = merge(wordFrequencies, obj["entry-map"]);
            }

            $scope.totalUniqueWords = Object.keys(wordFrequencies).length;

            $scope.$apply();

            createChart();
            createWordCloud();

            // Populate table for the first time
            // let tableArray = [];
            // for (let obj of Object.values(data[currentUser.uid])) {
            //     //console.log(Object.values(obj));
            //     tableArray.push(Object.values(obj));
            // }
            // console.log(tableArray);
            // //dataTable
            // $('#dataTable').DataTable({
            //     data: tableArray
            // })
        });
    }

    function repopulateTable(firstTime) {
        fetch('/getData')
            .then(function (response) {
                return response.json();
            }).then(function (data) {
            // USE data
            let tableArray = [];
            for (let obj of Object.values(data[currentUser.uid])) {
                let values = Object.values(obj);
                let array = [];
                array.push(values[0]);
                array.push(values[3]);
                array.push(values[2]);
                tableArray.push(array);
            }

            if (firstTime){
                $('#dataTable').DataTable({
                    data: tableArray
                })
            } else {
                $('#dataTable').DataTable().clear();
                $('#dataTable').DataTable().rows.add(tableArray).draw();
            }
        });
    }

    /**
     * Merge objects
     * @param objects
     * @returns {*}
     */
    function merge(...objects) {
        const merged = objects.reduce((a, obj) => {
            Object.entries(obj).forEach(([key, val]) => {
                a[key] = (a[key] || 0) + val;
            });
            return a;
        }, {});
        return Object.fromEntries(
            Object.entries(merged).sort(
                (a, b) => b[1] - a[1]
            )
        );
    }

    /**
     * Creates a word bubble map
     */
    function createWordCloud() {
        let the_frequencies = {"children": []};
        for (let property in wordFrequencies) {
            if (wordFrequencies.hasOwnProperty(property)) {
                let obj = {};
                obj.Name = property.trim();
                obj.Count = wordFrequencies[property];
                the_frequencies["children"].push(obj);
            }
        }

        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var bubble = d3.pack(the_frequencies)
            .size([diameter, diameter])
            .padding(1.5);

        $("#word-cloud").empty();

        var svg = d3.select("#word-cloud")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(the_frequencies)
            .sum(function (d) {
                return d.Count;
            });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function (d) {
                return !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function (d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .on("mouseover", function (d, i) {
                d3.select(this).style("fill", "red");
                console.log("Showing ", d.data.Name);
                showWordData(d.data.Name)
            })
            .on("mouseout", function (d, i) {
                d3.select(this).style("fill", color(i));
            });

        // Word
        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");

        // Count
        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Count;
            })
            .attr("font-family", "Gill Sans", "Gill Sans MT")
            .attr("font-size", function (d) {
                return d.r / 5;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");

    }

    /**
     * Display the word data next to word bubble map
     * @param word
     */
    function showWordData(word) {
        $scope.wordmuse = {};
        $scope.wordmuse.word = word;

        fetch('https://api.datamuse.com/words?rel_syn=' + word + '&md=d')
            .then(function (response) {
                return response.json();
            }).then(function (data) {
            $scope.wordmuse.words = data;
            $scope.$apply();
        });
        $scope.$apply();
    }


    /**
     * Creates a chart
     */
    function createChart() {
        let freqCount = Object.values(wordFrequencies);
        let word = Object.keys(wordFrequencies);

        word = word
            .map((item, index) => [freqCount[index], item]) // add the clickCount to sort by
            .sort(([count1], [count2]) => count2 - count1) // sort by the clickCount data
            .map(([, item]) => item); // extract the sorted items

        freqCount = freqCount.sort(function (a, b) {
            return b - a
        });

        word = word.slice(0, 10);
        freqCount = freqCount.slice(0, 10);

        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#858796';

        // Bar Chart Example
        $("#chart-bar-container").empty();
        let ctx = document.createElement("canvas");
        document.getElementById("chart-bar-container").appendChild(ctx);

        let myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: word,
                datasets: [{
                    label: "Frequency",
                    backgroundColor: "#4e73df",
                    hoverBackgroundColor: "#2e59d9",
                    borderColor: "#4e73df",
                    data: freqCount,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        maxBarThickness: 25,
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: Math.max(...freqCount),
                            maxTicksLimit: 5,
                            padding: 10
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ': ' + tooltipItem.yLabel;
                        }
                    }
                },
            }
        });
    };

    /**
     * File upload from input for tesseract OCR
     * @param files
     */
    $scope.fileUpload = function (files) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        };

        reader.readAsDataURL(files[0]);
        const worker = new Tesseract.TesseractWorker();
        worker.recognize(files[0]).progress(function (data) {
            $scope.value = data.progress * 100;
            $scope.status = data.status;
            $scope.$apply();
        }).then(function (data) {
            $("#output").html(data.hocr);
            var box = $("#comment");
            box.val(box.val() + data.text);
        })
    };
});


