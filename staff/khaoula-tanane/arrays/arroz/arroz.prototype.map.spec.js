describe('Arroz.prototype.map', function() {

    it('should map array and multiply * 2', function(){
        var numbers = new Arroz(1,2,3,4,5)

        var mapped = numbers.map(function(number){
            return number * 2
        })

        console.log(mapped)
        for(var i = 0; i < mapped.length; i++){
            expect(mapped[i]).toBe(numbers[i]*2)
    
        }

    })

    it('should return index', function(){

        var numbers = new Arroz(1,2,3,4,5)

        var map = numbers.map(function(number, i){
            return numbers[i]
        })
    for(var i = 0; i < map.length; i++){
        expect(map[i]).toBe(numbers[i])
    }        

    })


}) 