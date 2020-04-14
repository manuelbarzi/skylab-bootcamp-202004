describe('Arroz.prototype.find', function() {

    it('should find first element that passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        var found = names.find(function(name){
            return name.length === 4
        })
        expect(found).toBe('alex')
    })

    it('should return undefined when no passes condition', function(){
        var names = new Arroz('manuel', 'juanito', 'alex', 'kaula')
        var found = names.find(function(name){
            return name.length === 8
        })
        expect(found).not.toBeDefined();
    })

}) 