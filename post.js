document.addEventListener('DOMContentLoaded', bindingOfJS);

function bindingOfJS() {
    document.getElementById('submitInfo').addEventListener('click', function(e) {
        var request = new XMLHttpRequest();
        var toSend = {"name": document.getElementById("name").value, "weight": document.getElementById("weight").value, "reps": document.getElementById("reps").value};
        toSend = JSON.stringify(toSend);
        //toSend.push(document.getElementById("name").value);
        //toSend.push(document.getElementById("weight").value);
        //toSend.push(document.getElementById("reps").value);
        request.open("POST", "http://httpbin.org/post", true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load',function() {
            if(request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                var weight = response.json["weight"];
                var reps = response.json["reps"];
                var name = response.json["name"];
                var nameText = document.getElementById("yourName");
                nameText.textContent = name;
                if(reps == 1) {
                    var oneRepMax = weight;
                    var repString = oneRepMax.toString();
                    var current = document.getElementById("hundredPercent");
                    current.textContent = repString;
                }
                else {
                    var oneRepMax = Math.floor(weight * (1 + reps / 30));
                    var repString = oneRepMax.toString();
                    var current = document.getElementById("hundredPercent");
                    current.textContent = repString;
                    console.log(oneRepMax);
                }
                var oneRM = document.getElementById("oneRepMax");
                oneRM.textContent = oneRepMax + " lbs";
                for(var index = 0, multiplier = 0.9; index < 7; index++)
                {
                    current = current.parentElement.nextElementSibling.firstElementChild;
                    var rM = Math.floor(oneRepMax * multiplier);
                    repString = rM.toString();
                    current.textContent = repString;
                    multiplier = multiplier - 0.1;
                }
            } else {
                console.log("Request Error: " + request.statusText);
            }
        });
        request.send(toSend);
        e.preventDefault();
    })
}